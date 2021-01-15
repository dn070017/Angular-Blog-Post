import mongoose     from 'mongoose';
import readlineSync from 'readline-sync';
import config       from '../config/config.mjs';
import auth         from '../config/auth.mjs';
import User         from '../models/user.mjs';

const connectParams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    auth: { "authSource": "admin" } 
}
const portDB = config.portDB
const dbName = config.dbName

async function createUser() {

    let connected  = false;
    let checkUser  = false;
    let checkEmail = false;
    mongoose.set('useCreateIndex', true);

    let adminUsername = config.adminUsername;
    let adminPassword = config.adminPassword;

    while (!connected) {
        if (!adminUsername && !adminPassword){
            adminUsername = readlineSync.question(`\nEnter database admin username:\n`);
            adminPassword = readlineSync.question(`\nEnter database admin password:\n`, { hideEchoBack: true });
        }
        const url = `mongodb://${adminUsername}:${adminPassword}@localhost:${portDB}/${dbName}`;
        await mongoose.connect(url, connectParams, (err) => {
            if(err){
                console.error('\n[DB:001] Failed to connect to database\n');
                adminUsername = null;
                adminPassword = null;
                process.exit(1); 
            }
        });
        connected = true;
    }
    console.log('成功連結到資料庫\n');

    let email;
    let username;
    let existedUser;

    while (!checkUser) {
        username = readlineSync.question(`請輸入要新增的使用者帳號：\n`);
        existedUser = await User.findOne({ username: username }).catch(err => {
            console.error(err);
            process.exit(1);
        });
        if(existedUser)
            console.log(`\n${username} 已經存在於資料庫中，請重新輸入\n`)
        else
            checkUser = true;
    }

    while (!checkEmail) {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        email = readlineSync.question(`\n請輸入使用者電子郵件\n`);
        if(re.test(email)){
            existedUser = await User.findOne({ email: email }).catch(err => {
                console.error(err);
                process.exit(1);
            });
            if(existedUser) 
                console.log(`\n電子郵件 ${email} 已存在於資料庫中，請重新輸入\n`)
            else
                checkEmail = true;
        } else
            console.log('\n電子郵件的格式錯誤，請重新輸入\n');
    }

    let password = Array(8).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    
    const user = new User({
        username: username,
        email: email,
        password: password,
    });

    await auth.encrypt(user).catch(err => { 
        console.error(err);
        process.exit(1); 
    });

    await user.save().catch(err => {
        console.error(err);
        process.exit(1);
    });
    
    console.log(`\n帳號已新增置資料庫\n使用者名稱：${user.username}\n使用者密碼：${password}\n`);

    await mongoose.disconnect().catch(err => {
        console.error(err);
        process.exit(1);
    });
}

createUser();
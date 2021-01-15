export class User {
    objectId:          string;
    username:          string;
    email:             string;
    name:              string;
    createDate:        string;

    constructor(object: any){
        this.objectId          = object._id;
        this.username          = object.username;
        this.email             = object.email;
        this.name              = object.name;
        this.createDate        = object.createDate
    }

    public toJSON(): Object {
        return Object.getOwnPropertyNames(this).reduce((obj, key) => {
            obj[key] = this[key];
            return obj;
        }, {});
    }
}

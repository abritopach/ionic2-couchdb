export class Environment {

    private url: String;
    private port: Number;
    private absoluteURL: String


    constructor(type: string) {
        switch (type)
        {
            case'LOCALHOST':
                this.url = "http://127.0.0.1";
                this.port = 5984;
                this.absoluteURL = this.url + ':' + this.port.toString() + '/couchblog/';
                break;
            case'DEVELOPMENT':
                this.url = "http://192.168.1.38";
                this.port = 5986;
                this.absoluteURL = this.url + ':' + this.port.toString() + '/couchblog/';
                break;
            default:
                this.url = "http://127.0.0.1";
                this.port = 5984;
                this.absoluteURL = this.url + ':' + this.port.toString() + '/couchblog/';
                break;
        }

    }

    getURL() : String {
        return this.absoluteURL;
    }

}
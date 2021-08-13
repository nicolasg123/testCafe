import * as fs from "fs";

export class FileLogger{

    public fileData:string[] = [];
    public filePath = "logs/testlog.log";
    public saveToFile = false;

    public log(string: string){
        if(this.saveToFile){
            this.fileData.push(string);
        }
    }

    public writeFile(){
        console.log("printing to file");
        let string = '';
        for(let i in this.fileData){
            string+=this.fileData[i];
            string+="\n";
        }
        if(fs.existsSync(this.filePath)){
            fs.appendFileSync(this.filePath,string);
        }else{
            fs.writeFileSync(this.filePath,string);
        }

    }
}

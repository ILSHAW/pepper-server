import { PipeTransform, Injectable } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"

@Injectable()
export class FileTypePipe implements PipeTransform {
    private readonly exceptionService = new ExceptionService()
    private readonly mimetypes: Array<string> = []

    constructor(...mimetypes: Array<string>) {
        this.mimetypes = mimetypes
    }
    
    transform(value: Array<Express.Multer.File>) {
        return value?.map((file) => {
            if(this.mimetypes.includes(file.mimetype)) {
                return file
            }
            else {
                throw this.exceptionService.unprocessable("File mimetype is invalid")
            }
        })
    }
}
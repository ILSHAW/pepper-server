import { PipeTransform, Injectable } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"

@Injectable()
export class FileSizePipe implements PipeTransform {
    private readonly exceptionService = new ExceptionService()

    constructor(private readonly size: number) {}
    
    transform(value: Array<Express.Multer.File>) {
        return value.map((file) => {
            if(file.size < this.size) {
                return file
            }
            else {
                throw this.exceptionService.unprocessable("File is too large")
            }
        })
    }
}

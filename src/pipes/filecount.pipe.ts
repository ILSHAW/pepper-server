import { PipeTransform, Injectable } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"

@Injectable()
export class FileCountPipe implements PipeTransform {
    private readonly exceptionService = new ExceptionService()

    constructor(private readonly count: number) {}
    
    transform(value: Array<Express.Multer.File>) {
        if(value?.length <= this.count || value === undefined) {
            return value
        }
        else {
            throw this.exceptionService.unprocessable("Too many files")
        }
    }
}
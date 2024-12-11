import { IsOptional, IsString, IsUUID } from "class-validator"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

export class ExamFilterDTO {
    @IsOptional()
    @IsUUID(3)
    id: UUID

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    code: string
}
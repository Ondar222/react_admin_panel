import { UploadFile } from "antd";
import { HotelUpdateDto } from "./dto/update.dto";
import { Hotel } from "./hotel";

interface IUseHotel {
    hotel: Hotel | undefined;

    setHotel: () => void;

    createHotel: () => void;
    updateHotel: (dto: HotelUpdateDto) => Promise<void>;
    deleteHotel: () => void;

    uploadImage: (
        fieldName: string,
        file: UploadFile | Array<UploadFile>
    ) => Promise<void>

    deleteImage: (
        fieldName: string,
        images: Array<string>
    ) => Promise<void>
}

export type { IUseHotel }
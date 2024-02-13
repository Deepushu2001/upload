export interface StagesUpdationDetails {
}
export class StagesUpdationDetails {
    StageAllocationId: number;
    startDate: string;
    endDate: string;
    EntryBy: string;
    DateChangeRemarks:string;

    constructor(StageAllocationId: number,startDate: string, endDate: string, EntryBy: string,DateChangeRemarks:string){
        this.StageAllocationId = StageAllocationId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.EntryBy = EntryBy;
        this.DateChangeRemarks=DateChangeRemarks;
    }
}
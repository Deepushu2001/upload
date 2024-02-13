export interface StageAlloction {
}

export class StageAlloction {
    public StageAllocationId: number;
    public StageDescription:string;
      public StageId: number;
      public MetricAllocationId: number;
      public MetricId: number; 
      public StartDate: string;
      public EndDate : string;
      public EngineerUID : string;
      public Remarks : string;

      constructor (StageAllocationId: number,StageDescription:string,StageId: number,MetricAllocationId: number,MetricId: number,StartDate:string,EndDate:string,EngineerUID : string,Remarks : string){
        this.StageAllocationId=StageAllocationId;  
        this.StageDescription=StageDescription;
        this.StageId=StageId;
          this.MetricAllocationId=MetricAllocationId;
          this.MetricId=MetricId;
          this.StartDate=StartDate;
          this.EndDate=EndDate;
          this.EngineerUID=EngineerUID;
          this.Remarks=Remarks;
      }
  }

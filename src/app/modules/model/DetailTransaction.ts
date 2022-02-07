export class DetailTransaction {
    public nameTransaction!: string;
    public state!: string;
    public dateTransaction!: string;
    public request!: string;
    public response!: string;
    public transactionLogErrors: Array<any> = [];
}
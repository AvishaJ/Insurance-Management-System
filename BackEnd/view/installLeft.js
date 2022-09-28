class InstallmentLeft{
    constructor(installmentNo,installmentDate,installmentAmount)
    {
        this.installmentNo   = installmentNo;
        this.installmentDate = installmentDate;
        this.installAmount   = installmentAmount;
        this.payDate         = "Make Payment";
        this.paymentStatus   = "Pending";
        this.policyPayment   =  "";
    }
}
module.exports = InstallmentLeft;
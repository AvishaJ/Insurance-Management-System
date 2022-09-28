class InsuranceSetting{
    constructor()
    {
        //if Customer claim his amount before his maturity Date
        this.claimDeduction = 0;
        
        //if customer pay the installment amount late
        this.penaltyPay     = 0; 
    }
}

module.exports = InsuranceSetting;
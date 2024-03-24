// 1 : STUDENT GRADE GENERATOR CODE CHALLENGE 
let studentMarks=0;
let studentName= `Tony`;
// student marks greater than 79 to be assigned the grade A
if(studentMarks>79){
    console.log(`${studentName} you scored ${studentMarks}. You have an [A] Grade` )
}
// student marks between 60 and 79 to be assigned the grade B
else if(studentMarks>=60 && studentMarks<=79){
    console.log(`${studentName} you scored ${studentMarks}. You have a [B] Grade`)
}
// student marks between 49 and 59 to be assigned the grade C
else if(studentMarks>=49 && studentMarks<=59){
    console.log(`${studentName} you scored ${studentMarks}. You have a [C] Grade`)
}
// student marks between 40 and 49 to be assigned the grade D
else if(studentMarks>=40 && studentMarks<49){
    console.log(`${studentName} you scored ${studentMarks}. You have a [D] Grade`)
}
// student marks less than 40 to be assigned the grade E
else{
    console.log(`${studentName} you scored ${studentMarks}. You have an [E] Grade`)
}

// Challenge 2: Speed Detector

function calculateDemeritPoints(speed) {
    const speedLimit = 70;//Here we are assigning the speedLimit variable a value of 70
    let demeritPoints = 0;// Here we are assigning the demeritPoints a value of 0

    // When the speed keyed in is less than 70 it returns the msg Ok
    if (speed <= 70) {
        console.log("Ok");

        //math. floor() function is used to return the closest integer that's smaller than or equal to the given number.
    } else {
        demeritPoints = Math.floor((speed - speedLimit) / 5);
        console.log("Points:", demeritPoints);
//When the demerits points exceed maximum limit of 12 points License is suspended
        if (demeritPoints > 12) {
            console.log("License suspended");
        }
    }
}

// Challenge 3 ; Net Salary Calculator

const readline = require('readline');

//define tax rates functions
function calculateTax(income){

    //define our taxslabs on the bases of the tax rates
    const taxSlabs= [
        //Tax rate of 10% for income of upto 24k
        {limit: 24000, rate: 0.1},

         //Tax rate of 25% for income of upto 24k
         {limit: 32333, rate:0.25},

          //Tax rate of 30% for income of upto 24k
          {limit:500000, rate: 0.3},

           //Tax rate of 35% for income of upto 24k
           {limit: 800000, rate: 0.35},

    ];

    //initialize our tax to zero
    let tax =0;
    //initialize remaining income to total income
    let remainIncome = income;

    //iterate theough each tax slab calculate the tax 
    for (const slab of taxSlabs){
        //check if there is any remaining income to be taxed
        if(remainIncome <=0) break;
        //calculate taxable amount within the current slab
        const taxableAmount =Math.min(remainIncome, slab.limit);
        //calculate the taxfor the taxable amount
        tax+= taxableAmount *slab.rate;

        //update 
        remainIncome -= taxableAmount
    }

    //return the total tax calculation
    return tax;
}

//define NHIF rates
function calculateNHIFDeductions(grossPay){
    const nhifRates = [
        {limit:5999, deduction: 150},
        {limit:11999, deduction: 400},
        {limit:29999, deduction: 850},
        {limit:100000, deduction: 1700},

    ];
    for (const rate of nhifRates){
        if (grossPay<= rate.limit){
            return rate.deduction;
        }
    }
    //exceed the highest limit
   return nhifRates[nhifRates.length - 1].deduction;

}


//define nssf rates 
function calculateNSSFContributions(pensionalPay){
    //employee contribution rate for tier 1
    const tierIRate = 0.06;
    //lowerlimit foe tier II
    const tierIILowestLimit = 7001; 

if(pensionalPay <= tierIILowestLimit){
    //is it within? calc contr based on tier 1 rate
    return pensionalPay * tierIRate;
} else {
    //if it exceeds
    return tierIILowestLimit * tierIRate;
}
}

//calc our net salary
function calculateNetSalary(basicSalary, benefits){
    //calc gross salary>>> adding basic salary and benefits
    const grossSalary = basicSalary + benefits;
    //calc tax 
    const tax = calculateTax(grossSalary);
    //calc NHIF decuctions based on grosssalary
    const NHIFDeductions = calculateNHIFDeductions(grossSalary);
    //calc NSSF ded based on basic
    const NSSFDeductions = calculateNSSFContributions(basicSalary);
    //net salary>> sub tax,nhif ded, & nssf ded from gross salary
    const netSalary = grossSalary - tax - NHIFDeductions - NSSFDeductions;

    //results
    return{
        grossSalary,
        tax,
        NHIFDeductions,
        NSSFDeductions,
        netSalary
    };
}

//function to get the user input
function getUserInput(question){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout

    });
 
 return new Promise((resolve) => {
    rl.question(question, (answer) =>{
        rl.close();
        resolve(parseFloat(answer));
    });
 });
}
 //function to run the program
 async function run(){
    //get user input for basic salary

    const basicSalary = await getUserInput("your basic salary = ");

    //get user benefits 
    const benefits = await getUserInput("Your Benefits = ");

    //calc net salary in response to user input
    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    //display the calc
    console.log("Gross = ", salaryDetails.grossSalary);
    console.log("Tax = ", salaryDetails.tax);
    console.log("NHIF Ded = ", salaryDetails.NHIFDeductions);
    console.log("NSSF Ded = ", salaryDetails.NSSFDeductions);
    console.log("Net = ", salaryDetails.netSalary);
 }

 run();

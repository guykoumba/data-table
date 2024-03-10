export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  export type Payments = {
    data: Payment[],
    meta: {
      totalRowCount: number
    }
  }

export async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed54g",
        amount: 300,
        status: "processing",
        email: "hu@example.com",
      },{
        id: "709ed52f",
        amount: 50,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "72ded52f",
        amount: 900,
        status: "success",
        email: "mo@example.com",
      },{
        id: "678ed54g",
        amount: 400,
        status: "failed",
        email: "opp@example.com",
      },{
        id: "809ed52f",
        amount: 570,
        status: "pending",
        email: "lpom@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed54g",
        amount: 300,
        status: "processing",
        email: "hu@example.com",
      },{
        id: "709ed52f",
        amount: 50,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "72ded52f",
        amount: 900,
        status: "success",
        email: "mo@example.com",
      },{
        id: "678ed54g",
        amount: 400,
        status: "failed",
        email: "opp@example.com",
      },{
        id: "809ed52f",
        amount: 570,
        status: "pending",
        email: "lpom@example.com",
      },
    ]
  }
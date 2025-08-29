
import express, { Request, Response } from 'express';
import cors from 'cors';
import { isNumber,isAlphabet,isSpecialCharacter,createAlternatingCaps } from './lib';

const app = express();
const PORT = process.env.PORT || 3000;

interface RequestBody{
    data: string[];
}

interface ResponseBody{
    is_success: boolean;
    user_id:string;
    email:string;
    roll_number:string;
    odd_numbers:string[];
    even_numbers: string[];
    alphabets: string[];
    special_characters: string[];
    sum: string;
    concat_string: string;
}

interface errorResponse{
    is_success:boolean;
    erro:string;
}

app.use(cors());
app.use(express.json());



app.post('/bfhl',(req:Request,res:Response)=>{
    try{
        const {data} = req.body;

        if(!data || !Array.isArray(data)){
            return res.status(400).json({
                is_success:false,
                error:"Invalid input"
            });
        }

        const oddNumbers: string[] = [];
        const evenNumbers: string[] = [];
        const alphabets: string[] = [];
        const special_characters: string[] = [];
        let sum = 0;

        for(let i=0;i<data.length;i++){
            const str = String(data[i]);

            if(isNumber(str)){
                const num = parseInt(str,10);
                sum+=num;

                if(num%2 == 0){
                    evenNumbers.push(str);
                }
                else{
                    oddNumbers.push(str);
                }
            }
            else if(isAlphabet(str)){
                alphabets.push(str.toUpperCase());
            }
            else if(isSpecialCharacter(str)){
                special_characters.push(str);
            }
        }

        const concatString = createAlternatingCaps(alphabets);

        const response : ResponseBody ={
            is_success: true,
            user_id : 'Harish_Raghavendra_22bce9884',
            email: 'harish.22bce9884@vitapstudent.ac.in',
            roll_number:'22BCE9884',
            odd_numbers:oddNumbers,
            even_numbers:evenNumbers,
            alphabets:alphabets,
            special_characters:special_characters,
            sum : sum.toString(),
            concat_string:concatString
        }

        res.status(200).json(response);
    }
    catch(err){
        console.log("Error :", err);
        res.status(500).json({
            is_success:false,
            errro:"Internal server error"
        });
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

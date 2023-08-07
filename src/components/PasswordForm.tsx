import { Card, CardContent, Typography, TextField, CardActionArea, Button, Box } from "@mui/material"
import { FC } from "react";


export type PasswordFormProps = {
    password: string;
    setPassword: (password:string) => void;
}

const PasswordForm: FC<PasswordFormProps> = ({ password,setPassword}) => {

    return (<Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
               
                <TextField type="password" label='Password' value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }}></TextField>
            </CardContent>
            
        </Card>
    </Box>);
};


export default PasswordForm;
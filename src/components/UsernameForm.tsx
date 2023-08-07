import { Card, CardContent, Typography, TextField, CardActionArea, Button, Box } from "@mui/material"
import { FC } from "react";


export type UsernameFormProps = {
    username: string;
    setUsername: (username:string) => void;
}

const UsernameForm: FC<UsernameFormProps> = ({ username,setUsername }) => {

    return (<Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
                
                <TextField label='Username' value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUsername(event.target.value) }}></TextField>
            </CardContent>
            
        </Card>
    </Box>);
};


export default UsernameForm;
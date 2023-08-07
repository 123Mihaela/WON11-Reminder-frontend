import { useState } from 'react';
import './App.css';
import { Box } from '@mui/system';
import UsernameForm from './components/UsernameForm';
import PasswordForm from './components/PasswordForm';
import { Alert, Button, Card, CardContent, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { DatePicker, LocalizationProvider, deDE } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useInterval } from 'usehooks-ts';


function App() {
  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  const[reminders, setReminders] = useState<any>([]);
  const[addReminderName, setAddReminderName] =useState<string>("");
  const[addReminderBirthday, setAddReminderBirthday] =useState<Date>(new Date());
  const[alerts, setAlerts] = useState<any>([]);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false)
  useInterval(
    () => {
      axios({
        method: 'post',
        url: "http://localhost:8080/reminders/alert",
        headers: {}, 
        data: {"username":username, "password":password}
      }).then((response) => setAlerts(response.data));  
    },
    // Delay in milliseconds 
    isPlaying ?  3000 : null,
  )
  
  const getReminders = ()=>{
  axios({
    method: 'post',
    url: "http://localhost:8080/reminders",
    headers: {}, 
    data: {"username":username, "password":password}
  }).then((response) => setReminders(response.data));  
  }

  const addReminder = ()=>{
    axios({
      method: 'post',
      url: "http://localhost:8080/reminders/new",
      headers: {}, 
      data: {"username":username, "password":password, "name": addReminderName, "birthday": addReminderBirthday}
    }).then(()=>getReminders()); 
    }

    const deleteReminder = (name:string) =>{
      axios({
        method: 'delete',
        url: "http://localhost:8080/reminders",
        headers: {}, 
        data: {"username":username, "password":password, "name": name}
      }).then(()=>getReminders());
    }
 return (
  <div>
  <Box className="App" sx={{ height: 1, justifyContent: 'center', width: 1, backgroundColor:'lightgray', display: 'flex', flexDirection:'column' }}>
   <UsernameForm username={username} setUsername={setUsername}></UsernameForm>
   <PasswordForm password={password} setPassword={setPassword}></PasswordForm>
   
<TextField label="Name" value={addReminderName} onChange={(e)=>setAddReminderName(e.target.value)}>Name</TextField>
<LocalizationProvider
  localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}
  adapterLocale="en-gb"
  dateAdapter={AdapterDayjs}>

<DatePicker value={dayjs(addReminderBirthday)} onChange={(date)=>date && setAddReminderBirthday(date.toDate())}/>
</LocalizationProvider>
<Button onClick={addReminder} variant="contained">
  Add Reminder
</Button>
<Button onClick={getReminders} variant="contained">
  Get Reminders
</Button>
<Button onClick={()=>setPlaying(!isPlaying)} variant="contained">
  Enable Alerts
</Button>
<List sx={{ width: 1, overflow: 'auto' }}>
{alerts.map((alert:any) => <ListItem sx={{ justifyContent: 'center' }}>
<Alert severity="info">{alert.name} {alert.birthday}</Alert>
  </ListItem>)}
  </List>
<List sx={{ width: 1, overflow: 'auto' }}>
{reminders.map((reminder:any) => <ListItem sx={{ justifyContent: 'center' }}>
          <Card sx={{ width: 0.8 }}>
            <CardContent>
              {/* <Typography variant="h6">{reminder.name} {reminder.birthday}</Typography> */}
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Name: {reminder.name}</Typography>
                  <Typography>Birthay: {reminder.birthday}</Typography>
                
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button onClick={()=>deleteReminder(reminder.name)} sx={{ color: 'red', margin: 1 }}>Delete</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ListItem>)}
      </List>
   </Box >
   </div>
 );

}

export default App;

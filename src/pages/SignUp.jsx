import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, MenuItem, Link, Grid, Box, Typography, Container, FormControlLabel, Checkbox, Stack } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'contexts/UserContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        PBL6
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpForm = () => {
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  const [form, setForm] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [phoneInputError, setPhoneInputError] = useState(false);
  const [idCardInputError, setIdCardInputError] = useState(false);

  const handlePhoneValidate = (e) => {
    try {
      // thử parseInt để kiểm tra kiểu số nguyên
      if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 0)
        throw new Error()
      else {
        setPhoneInputError(false)
      }
    }
    catch {
      if (e.target.value === '')
        setPhoneInputError(false)
      else
        setPhoneInputError(true)
    }
  }
  const handleIdCardValidate = (e) => {
    try {
      // thử parseInt để kiểm tra kiểu số nguyên
      if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 0)
        throw new Error()
      else {
        setIdCardInputError(false)
      }
    }
    catch {
      if (e.target.value === '')
        setIdCardInputError(false)
      else
        setIdCardInputError(true)
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phoneInputError) {
      document.getElementById('phoneNumber').focus();
      return;
    } 
    if (idCardInputError) {
      document.getElementById('idCard').focus();
      return;
    } 

    setIsSending(true);
    const formData = new FormData(event.currentTarget);  
    console.log('form data')
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ': '+ pair[1]); 
    }

    if (form === 'customer') {
      // await registerCustomer(user.token, formData)
      //   .then(result => {
      //     console.log('Register customer result: ', result);
      //     setIsSending(false);
      //     setForm('customer-sended');
      //   })
      //   .catch(error => {
      //     console.warn('Register customer failed: ', error);
      //     alert('Đăng kí thất bại. Vui lòng thử lại sau.');
      //     setIsSending(false);
      //   })
    }
    else if (form === 'driver') {
      /* testing */
      // setTimeout(() => {
      //   setForm('driver-sended')
      //   setIsSending(false)
      // }, 5000);
      // return;

      const idCardImg2 = formData.get('idCardImg2');
      formData.append('idCardImg', idCardImg2);
      formData.delete('idCardImg2');
      const drivingLicenseImg2 = formData.get('drivingLicenseImg2');
      formData.append('drivingLicenseImg', drivingLicenseImg2);
      formData.delete('drivingLicenseImg2');
      
      // await registerDriver(user.token, formData)
      //   .then(result => {
      //     console.log('Register driver result: ', result);
      //     setIsSending(false);
      //     setForm('driver-sended');
      //   })
      //   .catch(error => {
      //     console.warn('Register driver failed: ', error);
      //     alert('Đăng kí thất bại. Vui lòng thử lại sau.');
      //     setIsSending(false);
      //   })
      };
  };

  if (form === 'driver')
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Typography sx={{ mb: 2 }}>
          Xin vui lòng cung cấp thông tin của tài xế.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fullName"
              label="Họ tên"
              name="fullName"
              autoComplete="name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="isMale"
              label="Giới tính"
              name="isMale"
              autoComplete='sex'
            >
              <MenuItem value={'true'}>Nam</MenuItem>
              <MenuItem value={'false'}>Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <DatePicker label="Ngày sinh" disableFuture
                format='YYYY-MM-DD'
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    id: "dateOfBirth",
                    name: "dateOfBirth"
                  },
                  actionBar: {
                    actions: ['clear']
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="tel"
              id="phoneNumber"
              label="Số điện thoại"
              name="phoneNumber"
              autoComplete="tel"
              error={phoneInputError}
              helperText={phoneInputError ? 'Sai định dạng số điện thoại' : ''}
              onChange={handlePhoneValidate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="idCard"
              label="Số căn cước công dân"
              name="idCard"
              error={idCardInputError}
              helperText={idCardInputError ? 'Sai định dạng số CCCD' : ''}
              onChange={handleIdCardValidate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="vehicleType"
              label="Loại phương tiện"
              name="vehicleType"
              >
              <MenuItem value={'MOTORCYCLE'}>Xe máy</MenuItem>
              <MenuItem value={'CAR'}>Ôtô</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="licensePlate"
              label="Số biển kiểm soát"
              name="licensePlate"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="drivingLicense"
              label="Số giấy phép lái xe"
              name="drivingLicense"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="avatar"
              label="Ảnh chân dung"
              name="avatar"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="idCardImg"
              label="Ảnh mặt trước CCCD"
              name="idCardImg"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="idCardImg2"
              label="Ảnh mặt sau CCCD"
              name="idCardImg2"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="drivingLicenseImg"
              label="Ảnh mặt trước giấy phép lái xe"
              name="drivingLicenseImg"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="drivingLicenseImg2"
              label="Ảnh mặt sau giấy phép lái xe"
              name="drivingLicenseImg2"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox required color="primary"/>}
              label="Tôi đã đọc và đồng ý với Chính sách của công ty"
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSending}
          sx={{ mt: 2, mb: 2 }}
        >
          Đăng kí
        </LoadingButton>
        <Button
          type="reset"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={()=> setForm('')}
        >
          Hủy
        </Button>
      </Box>
    )
  else if (form === 'driver-sended')
    return (
      <Stack maxWidth='70%' margin={2} spacing={2}>
        <Typography>
          Hồ sơ tài xế của bạn đã được gửi đi, và sẽ được xét duyệt trong vòng 2-3 ngày làm việc.
        </Typography>
        <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={() => navigate('/')}>
          Trở về đăng nhập
        </Button>
      </Stack>
    )
  else if (form === 'customer')
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Typography sx={{ mb: 2 }}>
          Xin vui lòng cung cấp thông tin của khách hàng.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="tel"
              id="phoneNumber"
              label="Số điện thoại"
              name="phoneNumber"
              autoComplete="tel"
              autoFocus
              error={phoneInputError}
              helperText={phoneInputError ? 'Sai định dạng số điện thoại' : ''}
              onChange={handlePhoneValidate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fullName"
              label="Họ tên"
              name="fullName"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              id="isMale"
              label="Giới tính"
              name="isMale"
              autoComplete='sex'
            >
              <MenuItem value={'true'}>Nam</MenuItem>
              <MenuItem value={'false'}>Nữ</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <DatePicker label="Ngày sinh" disableFuture
                format='YYYY-MM-DD'
                slotProps={{
                  textField: {
                    fullWidth: true,
                    id: "dateOfBirth",
                    name: "dateOfBirth"
                  },
                  actionBar: {
                    actions: ['clear']
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='file'
              inputProps={{ accept: 'image/*'}}
              id="avatar"
              label="Ảnh chân dung"
              name="avatar"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox required value="allowExtraEmails" color="primary"/>}
              label="Tôi đã đọc và đồng ý với Chính sách của công ty"
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSending}
          sx={{ mt: 2, mb: 2 }}
        >
          Đăng kí
        </LoadingButton>
        <Button
          type="reset"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={()=> setForm('')}
        >
          Hủy
        </Button>
      </Box>
    )
  else if (form === 'customer-sended') {
    setTimeout(async () => {
      const userSession = { token: user.token, role: 'customer' };
      setUser(userSession);
      navigate('/customer');
    }, 3000);

    return (
      <Stack maxWidth='80%' margin={2} spacing={2}>
        <Typography>
          Đăng kí khách hàng thành công. Tự động đăng nhập.
        </Typography>
      </Stack>
    )
  }
  else
    return (
      <Stack maxWidth='80%' margin={2} spacing={2}>
        <Typography>
          Chào mừng bạn đến với Go. Bạn đăng kí với vai trò gì.
        </Typography>
        <Button fullWidth variant="outlined" onClick={() => setForm('customer')}>
          Tôi là khách hàng
        </Button>
        <Button fullWidth variant="outlined" onClick={() => setForm('driver')}>
          Tôi là tài xế
        </Button>
      </Stack>
    )
}

const defaultTheme = createTheme();

export default function SignUp() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <SignUpForm/>
        </Box>
        <Copyright sx={{ mt: 5, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
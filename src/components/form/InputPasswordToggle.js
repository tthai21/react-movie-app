import IconEyeClose from 'components/icon/IconEyeClose';
import IconEyeOpen from 'components/icon/IconEyeOpen';
import React, { useState } from 'react';
import Password from './Password';

const InputPasswordToggle = ({control}) => {
    const [showPassword,setShowPassword] = useState(false)   
    return (
          <Password
        type="text"   
          name="password"     
          id="password"
          placeholder="Enter your password"
          control={control}         
          showPassword={showPassword}
        >{showPassword ?<IconEyeClose onClick={()=>setShowPassword(!showPassword)}/> : <IconEyeOpen onClick={()=>setShowPassword(!showPassword)}/>}</Password>
    );
};

export default InputPasswordToggle;
import { Injectable, HttpException } from '@nestjs/common';
import { User } from './database/entity/User.entity';
import { UserModelInput, UserModelResponse } from './model/user.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async unlockSensor(input): Promise<{}> {
    return input;
  }

  async loginUser(input:UserModelInput): Promise<UserModelResponse> {
    const checkDataInDb=await User.findOne({where:{
      Username:input.username,
      Password:input.password,
      DeviceId:input.deviceId
    }}).catch(err=>{
      console.log(err)
      throw new HttpException("Internal Server Error",500)
    })
    if(checkDataInDb){
      throw new HttpException("A user already exists",400)
    }else{
      let userEntityModel=new User();
      userEntityModel.Username=input.username;
      userEntityModel.Password=input.password;
      userEntityModel.DeviceId=input.deviceId;
      userEntityModel.Createddatetime=Date.now().toString();
      return {userId:(await User.insert(userEntityModel)).generatedMaps[0]['UserId']}
    }
  }
}

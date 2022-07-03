import { LoginInput, LoginOutput } from './dtos/login.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CraeteAccountInput,
  CreateAccountOutput,
} from './dtos/createAccount.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { EditProfileInput, EditProfileOutput } from './dtos/editProfile.dto';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { MeOutput } from './dtos/me.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Roles('Any')
  @Query(() => MeOutput)
  me(@CurrentUser() user: UserEntity): MeOutput {
    return {
      user,
    };
  }

  @Mutation(() => CreateAccountOutput, { description: 'Create Account' })
  async createAccount(
    @Args('input') createAccountInput: CraeteAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation(() => LoginOutput, { description: 'Login' })
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Roles('USER')
  @Mutation(() => EditProfileOutput, { description: 'Edit Profile' })
  async editProfile(
    @Args('input') editProfilInput: EditProfileInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(editProfilInput, currentUser.id);
  }
}

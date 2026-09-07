import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { OAuth2Client } from 'google-auth-library';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class GoogleAuthenticationService {
  private readonly oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {
    this.oauthClient = new OAuth2Client(
      this.jwtConfiguration.googleClientId,
      this.jwtConfiguration.googleClientSecret,
    );
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
        audience: this.jwtConfiguration.googleClientId,
      });

      console.dir(loginTicket, { depth: null });

      const payload = loginTicket.getPayload();

      console.dir(payload, { depth: null });

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastname,
      } = payload;

      if (!email) {
        throw new UnauthorizedException('Google account email is missing');
      }

      const user = await this.usersService.findOneByGoogleId(googleId);

      if (user) {
        return this.generateTokensProvider.genereateTokens(user);
      }

      if (!email || !firstName || !lastname) {
        throw new UnauthorizedException(
          'Required Google profile data is missing',
        );
      }

      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName: lastname,
        googleId,
      });

      return this.generateTokensProvider.genereateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

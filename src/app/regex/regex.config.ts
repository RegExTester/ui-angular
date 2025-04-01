import { environment } from '../../environments/environment';

export const CONFIG = {
  DELAY_TIME: 1500,
  MATCH_COLORS_COUNT: 5,
  REGEX_OPTIONS: {
    IgnoreCase:               {Value: 1 << 0, Name: 'Ignore Case'},
    Multiline:                {Value: 1 << 1, Name: 'Multiline'},
    ExplicitCapture:          {Value: 1 << 2, Name: 'Explicit Capture'},
    Compiled:                 {Value: 1 << 3, Name: 'Compiled'},
    Singleline:               {Value: 1 << 4, Name: 'Singleline'},
    IgnorePatternWhitespace:  {Value: 1 << 5, Name: 'Ignore Pattern Whitespace'},
    RightToLeft:              {Value: 1 << 6, Name: 'Right To Left'},
    ECMAScript:               {Value: 1 << 8, Name: 'ECMAScript'},
    CultureInvariant:         {Value: 1 << 9, Name: 'Culture Invariant'},
    ShowCaptures:             {Value: 1 << 15, Name: 'Show Captures'},
  },
  API: {
    DOTNET: {
      INFO:    environment.apiServer.dotnet + '/api/version',
      REGEX:   environment.apiServer.dotnet + '/api/regex'
    }
  }
};

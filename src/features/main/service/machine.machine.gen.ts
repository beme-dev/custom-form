/**
 *
 * All paths of the concerned files
 * 
 * ### Author
 *
 * chlbri (bri_lvi@icloud.com)
 *
 * [My GitHub](https://github.com/chlbri?tab=repositories)
 *
 * <br/>
 *
 * ### Documentation
 *
 * Link to machine lib [here](https://www.npmjs.com/package/@bemedev/app-ts).
 *
 * Link to this lib [here](https://www.npmjs.com/package/@bemedev/app-cli)
 *
 *
 * This file is auto-generated. Do not edit manually.
 */
   export type _AllPaths = {
    mainMachine: '/' | '/idle' | '/working' | '/working/idle' | '/working/register' | '/working/final';
  }
   /**
   * 
   * Constants as type helpers for the concerned file. 
   * Don't use it as values, just for typings
   * 
   * ### Author
   * 
   * chlbri (bri_lvi@icloud.com)
   * 
   * [My GitHub](https://github.com/chlbri?tab=repositories)
   * 
   * <br/>
   * 
   * ### Documentation
   *
   * Link to machine lib [here](https://www.npmjs.com/package/@bemedev/app-ts).
   * 
   * Link to this lib [here](https://www.npmjs.com/package/@bemedev/app-cli)
   * 
   * NB: This file is auto-generated. Do not edit manually.
   */
    export const SCHEMAS = {
   mainMachine: {
        __tsSchema: undefined as unknown as {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/'>;
      readonly states: {
        readonly idle: {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/idle'>;
    };
   readonly working: {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/working'>;
      readonly states: {
        readonly idle: {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/working/idle'>;
    };
   readonly register: {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/working/register'>;
    };
   readonly final: {
      readonly targets: Exclude<_AllPaths['mainMachine'], '/working/final'>;
    };
      };
      readonly initial: 'idle' | 'register' | 'final';
    };
      };
      readonly initial: 'idle' | 'working';
    },
      },
   }
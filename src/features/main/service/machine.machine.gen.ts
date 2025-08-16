


  /**
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
  export const __tsSchemas = {} as {
  "mainMachine": {
    "initial": [
      "idle",
      "working"
    ],
    "targets": [
      "/idle",
      "/working",
      "/working/idle",
      "/working/register",
      "/working/final"
    ],
    "states": {
      "idle": {
        "targets": [
          "/",
          "/working",
          "/working/idle",
          "/working/register",
          "/working/final"
        ]
      },
      "working": {
        "initial": [
          "idle",
          "register",
          "final"
        ],
        "targets": [
          "/",
          "/idle",
          "/working/idle",
          "/working/register",
          "/working/final"
        ],
        "states": {
          "idle": {
            "targets": [
              "/",
              "/idle",
              "/working",
              "/working/register",
              "/working/final"
            ]
          },
          "register": {
            "targets": [
              "/",
              "/idle",
              "/working",
              "/working/idle",
              "/working/final"
            ]
          },
          "final": {
            "targets": [
              "/",
              "/idle",
              "/working",
              "/working/idle",
              "/working/register"
            ]
          }
        }
      }
    }
  }
};
  
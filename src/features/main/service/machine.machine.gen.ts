
  /**
   * This file is auto-generated. Do not edit manually.
   */

  export const __tsSchemas = {
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
} as const;
  
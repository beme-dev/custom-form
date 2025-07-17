import { createTests } from '@bemedev/vitest-extended';
import { describe } from 'vitest';
import { mergeConditions } from './helpers';

describe('#01 => Mergeconditions', () => {
  const { acceptation, success, fails } = createTests(mergeConditions);

  describe('#01.00 => Acceptation', acceptation);

  describe(
    '#01.01 => Success',
    success(
      {
        invite: 'case #1 field',
        parameters: [[{ A: 1 }, { A: 4 }, { A: 7 }], ['A']],
        expected: { merged: [1, 4, 7], warnings: [] },
      },
      {
        parameters: [
          [
            { A: 1, B: 2, C: 3 },
            { A: 4, B: 5, C: 6 },
            { A: 7, B: 8, C: 9 },
            { A: 1, B: 2, C: 13 },
            { A: 4, B: 5, C: 16 },
            { A: 7, B: 8, C: 19 },
            { A: 1, B: 32, C: 3 },
            { A: 4, B: 35, C: 6 },
            { A: 7, B: 38, C: 9 },
            { A: 1, B: 32, C: 13 },
            { A: 4, B: 35, C: 16 },
            { A: 7, B: 38, C: 19 },
          ],
          ['A', 'B', 'C'],
        ],
        invite: 'case #3 fields',
        expected: {
          merged: {
            1: {
              2: [3, 13],
              32: [3, 13],
            },
            4: {
              5: [6, 16],
              35: [6, 16],
            },
            7: {
              8: [9, 19],
              38: [9, 19],
            },
          },
          warnings: [],
        },
      },
      {
        parameters: [
          [
            { A: 1, B: 2, C: 3, D: 4 },
            { A: 1, B: 2, C: 3, D: 14 },
            { A: 1, B: 2, C: 13, D: 4 },
            { A: 1, B: 2, C: 13, D: 14 },
            { A: 1, B: 22, C: 3, D: 4 },
            { A: 1, B: 22, C: 3, D: 14 },
            { A: 5, B: 2, C: 3, D: 4 },
            { A: 5, B: 2, C: 3, D: 14 },
            { A: 5, B: 6, C: 7, D: 8 },
            { A: 5, B: 6, C: 7, D: 18 },
          ],
          ['A', 'B', 'C', 'D'],
        ],
        invite: 'case #4 fields',
        expected: {
          merged: {
            1: {
              2: {
                3: [4, 14],
                13: [4, 14],
              },
              22: {
                3: [4, 14],
              },
            },
            5: {
              2: {
                3: [4, 14],
              },
              6: {
                7: [8, 18],
              },
            },
          },
          warnings: [],
        },
      },
      {
        parameters: [
          [
            { A: 1, B: 2, C: 3, D: 4, E: 5 },
            { A: 1, B: 2, C: 3, D: 4, E: 15 },
            { A: 1, B: 2, C: 3, D: 14, E: 5 },
            { A: 1, B: 2, C: 13, D: 4, E: 5 },
            { A: 1, B: 22, C: 3, D: 4, E: 5 },
            { A: 9, B: 2, C: 3, D: 4, E: 5 },
            { A: 9, B: 10, C: 11, D: 12, E: 13 },
            { A: 9, B: 10, C: 11, D: 12, E: 23 },
          ],
          ['A', 'B', 'C', 'D', 'E'],
        ],
        invite: 'case #5 fields',
        expected: {
          merged: {
            1: {
              2: {
                3: {
                  4: [5, 15],
                  14: [5],
                },
                13: {
                  4: [5],
                },
              },
              22: {
                3: {
                  4: [5],
                },
              },
            },
            9: {
              2: {
                3: {
                  4: [5],
                },
              },
              10: {
                11: {
                  12: [13, 23],
                },
              },
            },
          },
          warnings: [],
        },
      },
      {
        parameters: [
          [
            { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 },
            { A: 1, B: 2, C: 3, D: 4, E: 5, F: 16 },
            { A: 1, B: 2, C: 3, D: 4, E: 15, F: 6 },
            { A: 1, B: 2, C: 3, D: 14, E: 5, F: 6 },
            { A: 1, B: 2, C: 13, D: 4, E: 5, F: 6 },
            { A: 1, B: 22, C: 3, D: 4, E: 5, F: 6 },
            { A: 7, B: 8, C: 9, D: 10, E: 11, F: 12 },
            { A: 7, B: 8, C: 9, D: 10, E: 11, F: 22 },
          ],
          ['A', 'B', 'C', 'D', 'E', 'F'],
        ],
        invite: 'case #6 fields',
        expected: {
          merged: {
            1: {
              2: {
                3: {
                  4: {
                    5: [6, 16],
                    15: [6],
                  },
                  14: {
                    5: [6],
                  },
                },
                13: {
                  4: {
                    5: [6],
                  },
                },
              },
              22: {
                3: {
                  4: {
                    5: [6],
                  },
                },
              },
            },
            7: {
              8: {
                9: {
                  10: {
                    11: [12, 22],
                  },
                },
              },
            },
          },
          warnings: [],
        },
      },
      {
        parameters: [
          [
            { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7 },
            { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 17 },
            { A: 1, B: 2, C: 3, D: 4, E: 5, F: 16, G: 7 },
            { A: 1, B: 2, C: 3, D: 4, E: 15, F: 6, G: 7 },
            { A: 1, B: 2, C: 3, D: 14, E: 5, F: 6, G: 7 },
            { A: 1, B: 2, C: 13, D: 4, E: 5, F: 6, G: 7 },
            { A: 1, B: 22, C: 3, D: 4, E: 5, F: 6, G: 7 },
            { A: 8, B: 9, C: 10, D: 11, E: 12, F: 13, G: 14 },
            { A: 8, B: 9, C: 10, D: 11, E: 12, F: 13, G: 24 },
          ],
          ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ],
        invite: 'case #7 fields',
        expected: {
          merged: {
            1: {
              2: {
                3: {
                  4: {
                    5: {
                      6: [7, 17],
                      16: [7],
                    },
                    15: {
                      6: [7],
                    },
                  },
                  14: {
                    5: {
                      6: [7],
                    },
                  },
                },
                13: {
                  4: {
                    5: {
                      6: [7],
                    },
                  },
                },
              },
              22: {
                3: {
                  4: {
                    5: {
                      6: [7],
                    },
                  },
                },
              },
            },
            8: {
              9: {
                10: {
                  11: {
                    12: {
                      13: [14, 24],
                    },
                  },
                },
              },
            },
          },
          warnings: [],
        },
      },
    ),
  );

  describe('#01.02 => Fails', () => {
    describe(
      '#01.02.00 => One param',
      fails(
        {
          invite: 'No match lengths',
          parameters: [[{ A: 1 }, { A: 4 }, { A: 7, B: 8 }], ['A']],
          error: `La ligne 3 ne correspond pas au nombre d'en-têtes : (1 en-tête pour 2 valeurs)`,
        },
        {
          invite: 'No match keys',
          parameters: [[{ A: 1 }, { A: 4 }, { B: 7 }], ['A']],
          error: `La ligne 3 ne correspond pas aux en-têtes : (A)`,
        },
      ),
    );

    describe(
      '#01.02.01 => Two params',
      fails(
        {
          invite: 'No match lengths',
          parameters: [
            [{ A: 1 }, { A: 4 }, { A: 7, B: 8 }],
            ['A', 'B'],
          ],
          error: `La ligne 1 ne correspond pas au nombre d'en-têtes : (2 en-têtes pour 1 valeur)`,
        },
        {
          invite: 'No match keys',
          parameters: [
            [
              { A: 1, B: 2 },
              { A: 4, B: 2 },
              { B: 7, C: 5 },
            ],
            ['A', 'B'],
          ],
          error: `La ligne 3 ne correspond pas aux en-têtes : (A, B)`,
        },
      ),
    );
  });
});

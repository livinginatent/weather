export type WindDirection =
string
export const windDirectionTranslations: { [key in WindDirection]: string } = {
  N: "Şimal",
  NNE: "Şimal-şərq",
  NE: "Şimal-şərq",
  ENE: "Şimal-şərq",
  E: "Şərq",
  ESE: "Cənub-şərq",
  SE: "Cənub-şərq",
  SSE: "Cənub-şərq",
  S: "Cənub",
  SSW: "Cənub-qərb",
  SW: "Cənub-qərb",
  WSW: "Cənub-qərb",
  W: "Qərb",
  WNW: "Şimal-qərb",
  NW: "Şimal-qərb",
  NNW: "Şimal-qərb",
};
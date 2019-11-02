// ----------------------------------------------------------------------------------//
// Resolver Utilities | Apollo Graph
// Apollo V2
// David Michael Hogan | October 23, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import Sequelize, { Model } from "sequelize";
const Op = Sequelize.Op;

export const parseInput = input => JSON.parse(JSON.stringify(input));
export const encodeJSON = input => JSON.stringify(input);

export const errorSender = error => console.log(error); // ** eventually will be sent to other source **

export const errorHandler = (input, data, errorMessage) => {
  if (input) {
    throw `
=============== GRAPH ERROR ===============
${errorMessage}
${JSON.stringify(data)}
===========================================`;
  }
};

export const dateRange = (values) => {
  const { before, after } = values;
  if (before) {
    return { [Op.lte]: before }
  } else if (after) {
    return { [Op.gte]: after }
  } else {
    errorHandler(true, input, "DATE RANGE INPUT ERROR");
  }
}

export const intRange = (values) => {
  const { lte, gte } = values;
  if (lte) {
    return { [Op.lte]: lte }
  } else if (gte) {
    return { [Op.gte]: gte }
  } else {
    errorHandler(true, input, "INT RANGE INPUT ERROR");
  }
}

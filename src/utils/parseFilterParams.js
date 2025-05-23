const parseAge = (value) => {
  if (typeof value === 'undefined') {
    return undefined;
  }

  const parsedAge = parseInt(value);

  if (Number.isNaN(parsedAge) === true) {
    return undefined;
  }

  return parsedAge;
};

export const parseFilterParams = (query) => {
  const { minAge, maxAge } = query;

  const parsedMinAge = parseAge(minAge);
  const parsedMaxAge = parseAge(maxAge);

  return {
    minAge: parsedMinAge,
    maxAge: parsedMaxAge,
  };
};

export const calculateDepth = (skillLevel) =>
  skillLevel < 15 ? Math.ceil((skillLevel + 1) / 5) : null;
export const calculateErrorProbability = (skillLevel) =>
  Math.round(skillLevel * 6.35 + 1);
export const calculateMaxError = (skillLevel) =>
  Math.round(skillLevel * -0.5 + 10);
export const formatTimeString = ({ depth, duration, increment }) => {
  let output = depth ? `depth ${depth}` : '';
  if (duration) {
    output += ` wtime ${duration} winc ${increment} btime ${duration} binc ${increment}`;
  }
  return output;
};

export const formatMoveString = (history) =>
  history.reduce(
    (output, { from, to, promotion }) =>
      `${output} ${from}${to}${promotion ?? ''}`,
    '',
  );

export const parseVariationMessage = (message) => {
  const parsed = message.split(' ');
  const cpKey = parsed.findIndex((item) => item === 'cp') + 1;
  const variationKey = parsed.findIndex((item) => item === 'pv') + 1;

  return {
    depth: parseInt(parsed[2]),
    cp: parseInt(parsed[cpKey]) / 100,
    variation: parsed.slice(variationKey),
  };
};

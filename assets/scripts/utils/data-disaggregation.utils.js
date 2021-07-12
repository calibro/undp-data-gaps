export const computeXValues = (data, disaggregation, scaleValue) => {
  return data
    .filter((d) => d.disaggregation === disaggregation)
    .map((d) => d[scaleValue])
}

export const computeYValues = (data, scaleValue) => {
  return data.map((d) => d[scaleValue]).sort()
}

export const computeRectsValues = (data, disaggregation) => {
  return data.filter((d) => d.disaggregation === disaggregation)
}

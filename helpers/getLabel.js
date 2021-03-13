const getLabel = (label, discount) => {
  return discount > 0 
          ? { color: 'green', content: `Знижка ${Math.round(discount * 100)}%` } 
          : label 
            ? { color: 'blue', content: label } : null
}

export default getLabel
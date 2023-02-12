export const sortData = (field, items, setItems, directory, direction = 'increase') => {
    // sorting data
    // direction = increase/decrease

    const copyData = items.concat()
    const sortData = copyData.sort(
      (a, b) => {
        console.log(field);
        if (direction === 'increase') {
            if (typeof(a[field]) === 'number' 
            && field !== 'downtime'
            && field !== 'duration'
            && field !== 'id'
            ) {
            return directory.find(obj => obj.id === a[field]).title > directory.find(obj => obj.id === b[field]).title ? 1 : -1
            } else {
            return a[field] > b[field] ? 1 : -1
            }
        } else {
            if (typeof(a[field]) === 'number' 
            && field !== 'downtime'
            && field !== 'duration'
            && field !== 'id'
            ) {
            return directory.find(obj => obj.id === a[field]).title > directory.find(obj => obj.id === b[field]).title ? -1 : 1
            } else {
            return a[field] > b[field] ? -1 : 1
            }
        }
      }
    );
    setItems(sortData);
  }
  
import React from 'react';

const Categories = (props) => {
  return (
    <tr>   
      <td>{props.category_id}</td>
      <td>{props.cat_name}</td>
      <td>{props.cat_desc}</td>
      <td>{props.created_by}</td>
      <td>{props.create_date}</td>
      <td><a href={'/edit_category/' + props.cat_id} className="btn btn-default pull-right"> Edit</a></td>
      <td><button onClick={() => props.deleteCategoryHandler(props.cat_id)} className="btn btn-danger"> Delete</button></td>
    </tr>
  )
} 
export default Categories;
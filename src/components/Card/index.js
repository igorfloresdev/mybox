const Card = ({title, text, button, children}) => {
  return (
    <div class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{text}</p>
        {children}
        <div class="card-actions justify-end">
          <button class="btn btn-primary">{button}</button>
        </div>
      </div>
    </div>
  )
}

export default Card
import React from 'react'

function Nutrients({item}) {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold sm:text-4xl">
        {item.item_title}
      </h2>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
        <img
          alt=""
          src={item.item_src}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-16">
        <article className="space-y-4 text-gray-600">
          <h1 className='text-red-500 text-2xl font-bold'>Nutrition Information:</h1>
          <ul type='square'>
            <p className='text-red-500'>Per Serving</p>
            <li>Calories: 400</li>
            <li>Carbs: 20</li>
            <li>Fat: 10</li>
            <li>Protein: 20</li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</section>
  )
}

export default Nutrients
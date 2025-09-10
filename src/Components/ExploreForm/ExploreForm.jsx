import React, { useState } from 'react'

function EventForm({ onClose, onAddEvent }) {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventDescription , setEventDescription ] = useState('')
  const [eventImage, setEventImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    onAddEvent({
      eventName,
      eventDate,
      eventDescription,
      eventImage,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2 text-[#33806b]">Add Event</h2>
      <label className="font-semibold">
        Event Name
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          required
        />
      </label>
       <label className="font-semibold">
        Description
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full resize-y min-h-[80px] max-h-[200px]"
          value={eventDescription}
          onChange={e => setEventDescription(e.target.value)}
          required
        />
      </label>
      <label className="font-semibold">
        Event Image (optional)
        <input
          type="file"
          accept="image/*"
          className="mt-1 p-2 border rounded w-full"
          onChange={e => setEventImage(e.target.files[0])}
        />
      </label>
      <label className="font-semibold">
        Event Date
        <input
          type="date"
          className="mt-1 p-2 border rounded w-full"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
          required
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[#33806b] text-white hover:bg-[#24604e]"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default EventForm
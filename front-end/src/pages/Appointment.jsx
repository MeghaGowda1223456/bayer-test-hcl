import React from 'react'

const APPOINTMENT_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"]

const DOCTOR_LIST = ["Doc1","DOC2","Doc3"]

function Appointment() {
    const handleSubmit = (e) => {
        console.log('In handle submit')
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = Object.fromEntries(formData.entries())

        // console.log('In handle submit')
        console.log(formObj)
    }
    return (
        <div className=' w-full h-full flex flex-col gap-3'>
            <h1 id='title' className=' text-3xl flex flex-col font-bold  text-custom-blue justify-center text-center' >Book an Appointment</h1>
            <form className=' w-full h-full flex flex-row' onSubmit={handleSubmit}>
                <div className='w-[50%] bg-slate-50 h-full gap-3 text-custom-blue text-md flex flex-col p-4 font-semibold'>
                    <label htmlFor="selectDoctor">Select Doctor</label>
                    <select name="doctor" id="doctor" className=' p-3' required >
                        {DOCTOR_LIST.map(item=><option key={item} value={item}>{item}</option>)}
                       
                    </select>

                    <label htmlFor="selectDate">Select Date</label>
                    <input id='selectDoctor' type="date" className="p-2 text-gray-600" name='selectedDate' required />

                    <input type="text" placeholder='[Calendar Placeholder]' className="p-4" />
                </div>
                <div className='w-[50%] bg-slate-50 h-full gap-3 text-custom-blue text-md flex flex-col p-4 font-semibold'>
                    <label>Available Time Slots</label>
                    <div className=' grid grid-cols-3 grid-rows-2 gap-2 '>
                    
                        {APPOINTMENT_SLOTS.map(item => <input type='button' name='slot' required key={item} defaultValue={item} className=' bg-gray-100 p-2 hover:bg-custom-blue hover:text-white' />)}
                    
                    </div>

                    <label htmlFor="">Reason for Visit</label>
                    <textarea name="reason" id="" cols="30" rows="10" required></textarea>

                    <label htmlFor="">Additional Notes (Optional)</label>
                    <textarea name="add-notes" id="" cols="30" rows="10"></textarea>

                    <button className=' w-full p-3  bg-custom-green text-white'>Confirm Booking</button>
                </div>
            </form>
        </div>
    )
}

export default Appointment
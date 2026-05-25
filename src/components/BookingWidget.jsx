import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Key, CheckCircle } from 'lucide-react';

export default function BookingWidget() {
  const [submitResult, setSubmitResult] = useState(null);
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      checkIn: null,
      checkOut: null,
      guests: '2',
      roomType: 'The Ullswater Suite',
    },
  });

  const checkInDate = watch('checkIn');

  const onSubmit = (data) => {
    // Form check logic
    const formattedCheckIn = data.checkIn ? data.checkIn.toLocaleDateString('en-GB') : '';
    const formattedCheckOut = data.checkOut ? data.checkOut.toLocaleDateString('en-GB') : '';
    
    setSubmitResult({
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guests: data.guests,
      roomType: data.roomType,
    });
    
    // Clear form after delay
    setTimeout(() => {
      reset();
      setSubmitResult(null);
    }, 6000);
  };

  return (
    <section id="booking" className="bg-forest py-20 lg:py-28 text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left panel: Invitation */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pt-6">
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold uppercase mb-5">
              Reservations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-cream leading-tight mb-4">
              Your stay awaits
            </h2>

            <p className="font-serif text-base text-cream/85 leading-relaxed font-normal mb-8">
              Arrive at the peaceful shores of Ullswater and step into the welcoming warmth of 
              Sharrow Bay. Whether checking in for a quiet weekend retreat in Cumbria or a special culinary 
              journey, let us make your arrangements seamless. 
            </p>
            <div className="flex flex-col space-y-4 border-t border-gold/10 pt-6 w-full text-cream/70 text-xs">
              <p className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                <span className="font-medium">Check-in: From 3:00 PM &bull; Check-out: 11:00 AM</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 bg-gold flex-shrink-0" />
                <span className="font-medium">Award-winning breakfast included in all suite bookings</span>
              </p>
            </div>
          </div>

          {/* Right panel: React Hook Form */}
          <div className="lg:col-span-7 bg-[#171512] border border-gold/15 p-8 sm:p-10 relative">

            <AnimatePresence mode="wait">
              {!submitResult ? (
                <motion.form
                  key="booking-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 z-10 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Check In Date */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold tracking-wider text-cream/90 uppercase mb-2 flex items-center space-x-1.5">
                        <Calendar size={12} className="text-gold" />
                        <span>Check-In Date</span>
                      </label>
                      <Controller
                        control={control}
                        name="checkIn"
                        rules={{ required: 'Arrival date is required' }}
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select date"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            selectsStart
                            startDate={field.value}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="w-full bg-[#1F1C18] border border-gold/15 px-4 py-3 text-sm text-cream font-sans outline-none focus:border-gold transition-colors"
                          />
                        )}
                      />
                      {errors.checkIn && (
                        <span className="text-[10px] font-sans text-gold font-bold uppercase mt-1 tracking-wider">
                          {errors.checkIn.message}
                        </span>
                      )}
                    </div>

                    {/* Check Out Date */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold tracking-wider text-cream/90 uppercase mb-2 flex items-center space-x-1.5">
                        <Calendar size={12} className="text-gold" />
                        <span>Check-Out Date</span>
                      </label>
                      <Controller
                        control={control}
                        name="checkOut"
                        rules={{ required: 'Departure date is required' }}
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select date"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            selectsEnd
                            startDate={checkInDate}
                            endDate={field.value}
                            minDate={checkInDate || new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="w-full bg-[#1F1C18] border border-gold/15 px-4 py-3 text-sm text-cream font-sans outline-none focus:border-gold transition-colors"
                          />
                        )}
                      />
                      {errors.checkOut && (
                        <span className="text-[10px] font-sans text-gold font-bold uppercase mt-1 tracking-wider">
                          {errors.checkOut.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Guests Selection */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold tracking-wider text-cream/90 uppercase mb-2 flex items-center space-x-1.5">
                        <User size={12} className="text-gold" />
                        <span>Guests</span>
                      </label>
                      <Controller
                        control={control}
                        name="guests"
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-[#1F1C18] border border-gold/15 px-4 py-3 text-sm text-cream font-sans outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#1F1C18] text-cream">1 Guest</option>
                            <option value="2" className="bg-[#1F1C18] text-cream">2 Guests</option>
                            <option value="3" className="bg-[#1F1C18] text-cream">3 Guests</option>
                            <option value="4" className="bg-[#1F1C18] text-cream">4 Guests</option>
                          </select>
                        )}
                      />
                    </div>

                    {/* Room Type Selection */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-sans font-bold tracking-wider text-cream/90 uppercase mb-2 flex items-center space-x-1.5">
                        <Key size={12} className="text-gold" />
                        <span>Room or Suite</span>
                      </label>
                      <Controller
                        control={control}
                        name="roomType"
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full bg-[#1F1C18] border border-gold/15 px-4 py-3 text-sm text-cream font-sans outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                          >
                            <option value="The Ullswater Suite" className="bg-[#1F1C18] text-cream">The Ullswater Suite</option>
                            <option value="The Damask Canopy Room" className="bg-[#1F1C18] text-cream">The Damask Canopy Room</option>
                            <option value="The Heritage Damask Room" className="bg-[#1F1C18] text-cream">The Heritage Damask Room</option>
                            <option value="The Edwardian Sitting Suite" className="bg-[#1F1C18] text-cream">The Edwardian Sitting Suite</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full text-[11px] font-sans font-bold tracking-[0.25em] bg-gold text-cream py-4 uppercase hover:bg-cream hover:text-forest transition-colors duration-300 border border-gold"
                  >
                    Check Availability
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="submit-success"
                  className="py-12 flex flex-col items-center text-center text-cream z-10 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <CheckCircle size={48} className="text-gold mb-6 animate-bounce" strokeWidth={1.2} />
                  <h3 className="font-serif text-2xl font-semibold text-cream mb-4">
                    Checking Availability...
                  </h3>
                  <p className="font-serif text-sm text-cream/80 leading-relaxed max-w-md mb-6 font-normal">
                    Thank you. We are verifying availability for <strong>{submitResult.roomType}</strong> for 
                    <strong> {submitResult.guests} guests</strong>, from <strong>{submitResult.checkIn}</strong> to 
                    <strong> {submitResult.checkOut}</strong>.
                  </p>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-gold uppercase font-bold animate-pulse">
                    Please stand by, a concierge will contact you
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

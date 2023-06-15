import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema(
    {
        serial: {
            type: String,
            required: [true, "Please provide a serial number"]
        },
        category : {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const Ticket = mongoose.model('Ticket', ticketSchema);
//module.exports = Ticket;
export default Ticket;
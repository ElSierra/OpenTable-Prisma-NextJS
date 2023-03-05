interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean
}
export default function AuthModalInputs({ inputs, handleChange, isSignIn}: Props) {
  return (
    <div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          name="firstName"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="First Name"
          onChange={handleChange}
          value={inputs.firstName}
        ></input>
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Last Name"
          value={inputs.lastName}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
        />
      </div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Phone"
          value={inputs.phone}
        ></input>
        <input
          type="text"
          name="city"
          onChange={handleChange}
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="City"
          value={inputs.city}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
        />
      </div>
    </div>
  );
}

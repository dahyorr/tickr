interface Props {
  pairingCode: string;
}
const PreviewClientPairing = ({ pairingCode }: Props) => {
  return (
    <div>
      <h1 className="text-center text-5xl mb-6">
        Register this client with the pairing code
      </h1>
      <p className="text-9xl font-bold text-center tracking-widest">{pairingCode}</p>
    </div>
  )
}
export default PreviewClientPairing
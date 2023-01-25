type Props = {
  children: JSX.Element
};

export default function Layout({ children }: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
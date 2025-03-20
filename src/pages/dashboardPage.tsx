import { useAuth } from "@/context/auth_context"

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div>
      {
        user ? (
          <div>
            <img className="size-10 rounded-full" src={user.avatar} alt="avatar" />
            <h1> {user.name} </h1>
          </div>
        ) : (
          <h1> User not found </h1>
        )
      }
    </div>
  )
}

export default DashboardPage
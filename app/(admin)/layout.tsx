export default function AdminLayout({ children }: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body>
				<main>
					<div className="admin-main-page">{children}</div>
				</main>			
			</body>	
		</html>
	)
}
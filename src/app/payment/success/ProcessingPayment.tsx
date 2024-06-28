export default function ProcessingPayment() {
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<div className="flex items-center justify-center">
					<div className="h-12 w-12 animate-spin text-primary" />
				</div>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">결제를 진행하고 있습니다.</h1>
				<p className="mt-4 text-muted-foreground">결제가 진행 중입니다. 잠시만 기다려주세요.</p>
			</div>
		</div>
	);
}

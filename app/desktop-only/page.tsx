export default function DesktopOnly() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Desktop Only</h1>
                <p className="text-gray-600">
                    The ResQMe Responder Dashboard is optimized for desktop use only. 
                    Please access it from a desktop or laptop computer.
                </p>
            </div>
        </div>
    );
}
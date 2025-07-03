type FormListPorps = {};


const FormList = ({ }: FormListPorps) => {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full table-auto border border-gray-400 border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Age</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">John Doe</td>
                        <td className="border border-gray-300 px-4 py-2">28</td>
                        <td className="border border-gray-300 px-4 py-2">New York</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
                        <td className="border border-gray-300 px-4 py-2">34</td>
                        <td className="border border-gray-300 px-4 py-2">Los Angeles</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">Sam Brown</td>
                        <td className="border border-gray-300 px-4 py-2">22</td>
                        <td className="border border-gray-300 px-4 py-2">Chicago</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default FormList;
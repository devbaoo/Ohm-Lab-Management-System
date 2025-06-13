import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Upload, X, Check, FileText } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

export default function SubmitReportScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    { label: "Select a course", value: "" },
    { label: "ELE201 - Digital Circuit Design", value: "ELE201" },
    { label: "ELE305 - Microcontroller Programming", value: "ELE305" },
    { label: "ELE203 - Electronic Devices", value: "ELE203" },
    { label: "ELE101 - Basic Circuit Analysis", value: "ELE101" },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setUploadedFiles([
        ...uploadedFiles,
        { id: Date.now().toString(), name: "Lab_Report.pdf", size: "2.4 MB" },
      ]);
      setIsUploading(false);
    }, 1500);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const handleSubmit = () => {
    if (!title || !description || !course || uploadedFiles.length === 0) {
      alert("Please fill in all fields and upload at least one file");
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Report submitted successfully!");
      navigation.goBack();
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Submit Lab Report</Text>

        <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
          <Text className="font-medium mb-2">Report Title</Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Enter report title"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="font-medium mb-2">Course</Text>
          <View className="bg-gray-100 rounded-lg mb-4">
            <Picker selectedValue={course} onValueChange={(itemValue) => setCourse(itemValue)}>
              {courses.map((course, index) => (
                <Picker.Item key={index} label={course.label} value={course.value} />
              ))}
            </Picker>
          </View>

          <Text className="font-medium mb-2">Description</Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
            placeholder="Enter a brief description of your report"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text className="font-medium mb-2">Upload Files</Text>
          <TouchableOpacity
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center mb-4"
            onPress={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator color="#FF6600" />
            ) : (
              <>
                <Upload size={24} color="#6B7280" />
                <Text className="text-gray-600 mt-2">Tap to upload files</Text>
                <Text className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</Text>
              </>
            )}
          </TouchableOpacity>

          {uploadedFiles.length > 0 && (
            <View className="mb-4">
              <Text className="font-medium mb-2">Uploaded Files</Text>
              {uploadedFiles.map((file) => (
                <View key={file.id} className="flex-row items-center justify-between bg-gray-100 p-3 rounded-lg mb-2">
                  <View className="flex-row items-center">
                    <FileText size={20} color="#6B7280" />
                    <View className="ml-2">
                      <Text className="font-medium">{file.name}</Text>
                      <Text className="text-gray-500 text-xs">{file.size}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveFile(file.id)}>
                    <X size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className="flex-row justify-end mb-6">
          <TouchableOpacity className="bg-gray-200 rounded-lg py-3 px-5 mr-3" onPress={() => navigation.goBack()}>
            <Text className="font-medium">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary rounded-lg py-3 px-5 flex-row items-center"
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <Check size={20} color="#FFFFFF" />
                <Text className="text-white font-medium ml-2">Submit Report</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}